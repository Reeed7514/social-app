import { v2 as _cloudinary } from 'cloudinary';

const cloudinary = () => {
	const runtimeConfig = useRuntimeConfig();

	_cloudinary.config({
		cloud_name: runtimeConfig.cloudinaryCloudName,
		api_key: runtimeConfig.cloudinaryApiKey,
		api_secret: runtimeConfig.cloudinaryApiSecret,
	})

	return _cloudinary;
}

export const uploadToCloudinary = (image) => {
	return new Promise((resolve, reject) => {
		cloudinary().uploader.upload(image, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data)
		})
	})
}