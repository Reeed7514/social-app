import formidable from 'formidable';
import { createUser } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";
import { uploadToCloudinary } from '~/server/utils/cloudinary';

export default defineEventHandler(async (event) => {
	// const body = await readBody(event);

	const form = formidable({ multiples: true })

	const response = await new Promise((resolve, reject) => {
		form.parse(event.node.req, (err, fields, files) => {
			if (err) {
				reject({ err });
			}
			resolve({ fields, files })
		})
	})


	const { username, email, password, repeatPassword, name } = response.fields

	// console.log('response files', response.files)

	const file = response.files.profileImage

	// console.log('file', file)

	let cloudinaryResource = null

	if (file) {
		cloudinaryResource = await uploadToCloudinary(file.filepath)
	} else {
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: 'Bad profile picture'
		}))
	}


	if (!username || !email || !password || !repeatPassword || !name) {
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: 'Invalid params'
		}))
	}

	if (password !== repeatPassword) {
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: 'Passwords do not match'
		}))
	}

	const userData = {
		username,
		email,
		password,
		name,
		profileImage: file ? cloudinaryResource.secure_url : 'https://picsum.photos/200/200',
	};

	const user = await createUser(userData);

	return {
		body: userTransformer(user)
	}
})