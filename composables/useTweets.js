
export default () => {

	const usePostTweetModal = () => useState('post_tweet_modal', () => false)

	// the tweet you want to reply to
	const useReplyTweet = () => useState('reply_tweet', () => null)

	const useQuoteTweet = () => useState('quote_tweet', () => null)

	const setReplyTo = (tweet) => {
		const replyTweet = useReplyTweet()
		replyTweet.value = tweet

	}

	const setQuoteTweet = (tweet) => {
		const quoteTweet = useQuoteTweet()
		quoteTweet.value = tweet

	}

	const postTweet = (formData) => {

		const form = new FormData();

		form.append('text', formData.text);

		form.append('replyToId', formData.replyToId);

		form.append('quoteTweetId', formData.quoteTweetId);

		formData.mediaFiles.forEach((mediaFile, index) => {
			form.append('media_file_' + index, mediaFile);
		})

		return useFetchApi('/api/user/tweets', {
			method: 'POST',
			body: form
		})

	}

	const getTweets = (params = {}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi('/api/tweets', {
					method: 'GET',
					params
				});

				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}



	const getTweetById = (tweetId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi(`/api/tweets/${tweetId}`);

				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	const closePostTweetModal = () => {
		const postTweetModal = usePostTweetModal();
		postTweetModal.value = false;
	}

	const openPostTweetModal = () => {
		const postTweetModal = usePostTweetModal();
		postTweetModal.value = true;
	}

	const openPostTweetModalToReply = (tweet = null) => {
		const postTweetModal = usePostTweetModal();
		postTweetModal.value = true;

		setQuoteTweet(null)
		setReplyTo(tweet)
	}

	const openPostTweetModalToQuote = (tweet = null) => {
		const postTweetModal = usePostTweetModal();
		postTweetModal.value = true;

		setReplyTo(null)
		setQuoteTweet(tweet)
	}

	return {
		postTweet,
		getTweets,
		getTweetById,
		usePostTweetModal,
		openPostTweetModal,
		openPostTweetModalToQuote,
		openPostTweetModalToReply,
		closePostTweetModal,
		useReplyTweet,
		useQuoteTweet
	}
}