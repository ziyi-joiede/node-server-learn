const loginCheck = (username, password) => {
    // 先使用用假数据
    if (username === 'zhansan' && password === 123) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    loginCheck
}