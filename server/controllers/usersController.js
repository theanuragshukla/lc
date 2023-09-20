const users = require("../models/users.js");

const { ITEM_LIMIT } = require("../constants.js");
const { buildQuery, validate } = require("../utils/helpers.js");

const fetchUsers = async (req, res) => {
    let { page = 1, limit = ITEM_LIMIT[0] } = req.query;
    if (!ITEM_LIMIT.includes(Number(limit))) {
        limit = ITEM_LIMIT[0];
    }
    const data = await users
        .find({})
        .skip((page - 1) * limit)
        .limit(Number(limit));
    if (data && data.length !== 0) {
        res.json({
            status: true,
            data: data,
            msg: "success",
        });
        return;
    }
    res.json({
        status: false,
        data: [],
        msg: "failure",
    });
};

const searchUsers = async (req, res) => {
    const {
        text = "",
        country = "",
        school = "",
        page = 1,
        limit = ITEM_LIMIT[0],
    } = req.query;

    if (!ITEM_LIMIT.includes(Number(limit))) {
        limit = ITEM_LIMIT[0];
    }

    const queryValue = {
        ...(validate(text) && { text }),
        ...(validate(school) && { school }),
        ...(validate(country) && { countryCode: country }),
    };

    const query = await buildQuery(queryValue);
    if(Object.keys(query).length===0){
        res.json({
            status:false,
            msg:"Invalid Query"
        })
        return
    }
    const data = await users
        .find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    if (data && data.length !== 0) {
        res.json({
            status: true,
            data: data,
            msg: "success",
        });
        return;
    }
    res.json({
        status: false,
        msg: "failure",
    });
};

const regSearchUsers =  async (req, res) => {
try {
    const {q} = req.query
    var regex = new RegExp(q, 'i');
    const data = await users.find({username:regex}, 'username -_id').limit(20);
    res.status(200).json({status:true, msg:"Success", data:data.map(o=>o.username)});
} catch (error) {
    res.status(500).json({status:false, msg:error.message});
}
}

module.exports = {
    fetchUsers,
    searchUsers,
    regSearchUsers
};
