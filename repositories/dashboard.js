const { User, Room } = require("../models");

module.exports = {
    getCountUser: async () => {
        return await User.count();
    },
    getCountRoom: async (filter) => {
        if (filter) {
            let where = {};

            if (filter.status) {
                where.status = filter.status
            }

            if (filter.date) {
                where.date = filter.date;
            }

            return await Room.count({ where });
        } else {
            return await Room.count();
        }
    },
    getListRoom : async () => {
        return await Room.findAll({
            include : [ 
                "user"
            ]
        })
    }
}
