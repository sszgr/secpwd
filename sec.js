
// require CryptoJS
// INPUT _> KEY=SHA256(AES(INPUT)) _> API=>PWD
const _SecShat = "ff6ff4e8c47268f2d067b6082d79539c";

_md5 = function (raw) {
    return CryptoJS.MD5(raw).toString();
};
_sha256 = function (raw) {
    return CryptoJS.SHA256(raw).toString();
};
_aes = function (key, iv, raw) {
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
    _LocalGenSecPwd: function (key, symbols) {
        let data_arr = _sha256(key).toLowerCase().split('');
        let symbols_arr = symbols.split('');

        let sec_pwd = "";
        for (let i = 0; i < 32; i++) {
            const d = data_arr[i];
            const s = data_arr[i + 32];
            // symbols
            if (symbols_arr.length > 0 && "0123".indexOf(d) > -1) {
                sec_pwd += symbols_arr[(s.charCodeAt() + i) % symbols_arr.length]
                continue
            }
            if ("cdef".indexOf(d) > -1) {
                // upper
                sec_pwd += s.toUpperCase();
                continue
            }
            sec_pwd += s;
        }
        return sec_pwd
    },
    GenSecPwd: function (opt, callback) {
        // opt.key, opt.symbols
        var resp = {
            code: 0,
            message: null,
            result: []
        }
        resp.result.push({
            i: 0,
            k: opt.key,
            p: this._LocalGenSecPwd(opt.key, opt.symbols)
        });

        for (let i = 0; i < 5; i++) {
            const key = this.GenKey(Math.random().toString(), Math.random().toString(), opt.symbols);
            resp.result.push({
                i: i + 1,
                k: key,
                p: this._LocalGenSecPwd(key, opt.symbols)
            });
        }
        callback(resp);
        // or remote
        // $.get("g", opt, callback);
    }
};