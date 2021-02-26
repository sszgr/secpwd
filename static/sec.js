
// require CryptoJS
// INPUT _> KEY=SHA256(AES(INPUT)) _> API=>PWD
const _SecShat = "ff6ff4e8c47268f2d067b6082d79539c";

_md5 = function(raw) {
	return CryptoJS.MD5(raw).toString();
};
_sha256 = function(raw) {
	return CryptoJS.SHA256(raw).toString();
};
_aes = function(key, iv, raw) {
	key = CryptoJS.enc.Utf8.parse(key);
	raw = CryptoJS.enc.Utf8.parse(raw);
	var cfg = {
		iv: CryptoJS.enc.Utf8.parse(iv),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	};
	var cipher = CryptoJS.AES.encrypt(raw, key, cfg);
	return btoa(cipher.ciphertext);
};
const SecObj = {
	SHA256: _sha256,
	GenKey: function (m, f, c) {
		var sec_m = _md5(m + _SecShat);
		var sec_f = _md5(f + _SecShat);
		var raw = _md5(sec_m + sec_f + c + _SecShat);

		// Request API
		return _sha256(_aes(sec_m.substring(8, 24), sec_f.substring(8, 24), raw) + _SecShat)
	},
	GenSecPwd: function (k, callback) {
		$.get("g", {"k": k}, function (resp) {
			callback(resp);
		});
	}
};