
const decodeToken = (props) => {
	const fernet = require('fernet');
	const { encrypted } = props

	var secret = new fernet.Secret("F6Bha_RqzL0bu1UeWH1mkzqDTcgM9cuEWr_aZUhDUcs=")
	var token = new fernet.Token({
		secret: secret,
		ttl: 0,
		token: encrypted
	})

	return token.decode();

} 

export default decodeToken

