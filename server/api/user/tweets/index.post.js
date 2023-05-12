import formidable from 'formidable';
import { createTweet } from '~/server/db/tweets';
import { createMediaFile } from '~/server/db/mediaFile';
import { tweetTransformer } from '~/server/transformers/tweet';
import { uploadToCloudinary } from '~/server/utils/cloudinary';

export default defineEventHandler(async (event) => {
	const form = formidable({ multiples: true });
	const response = await new Promise((resolve, reject) => {
		form.parse(event.node.req, (err, fields, files) => {
			if (err) {
				reject({ err });
			}
			resolve({ fields, files })
		})
	})

	const { fields, files } = response;

	const userId = event.context?.auth?.user?.id;

	const tweetData = {
		text: fields.text,
		authorId: userId
	}

	// optional
	let replyToId = fields.replyToId;
	
	if (replyToId && replyToId !== 'null' && replyToId !== 'undefined') {
		tweetData.replyToId = replyToId;
	}

	const tweet = await createTweet(tweetData);

	// upload the media files to cloudinary and save the id&url into db
	const filePromises = Object.keys(files).map(async key => {
		const file = files[key];

		const cloudinaryResource = await uploadToCloudinary(file.filepath);

		return createMediaFile({
			url: cloudinaryResource.secure_url,
			providerPublicId: cloudinaryResource.public_id,
			tweetId: tweet.id,
			userId
		})
	})

	await Promise.all(filePromises);

	return {
		tweet: tweetTransformer(tweet)
	}
})