const _ = require("lodash");

/*4.6 and 4.7 not finished */

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let i = 0
	const sum = blogs.reduce((total, currentValue) => {
		return total + currentValue.likes
	}, i)
	return sum
}

const favoriteBlog = (blogs) => {

	const maxLike = blogs.reduce(
		(p, v) => {
			return (p > v.likes ? p : v.likes)
		}
	)
	return blogs.find(b => b.likes === maxLike)

}

const mostBlogs = (blogs) => {
	let results = _.chain(blogs)
		.countBy('author')
		.map(function (blogs, author) {
			return ({ author, blogs })
		})
		.sortBy('blogs')
		.last()
		.value()
	console.log('==', results)
	return results
}

const mostLikes = (blogs) => {
	let results = _.chain(blogs)
		.groupBy('author')
		.map(function (like, auth) {
			return ({ author: auth, likes: _.sumBy(like, 'likes') })
		})
		.sortBy('likes')
		.last()
		.value()
	console.log('==', results)
	return results
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
