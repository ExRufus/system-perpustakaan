const baseRespone = require("../libs/base-response");
const dashboardRepository = require("../repositories/dashboard");

/**
 * Function get data Dashboard
 * @returns data
 */
const getDataDashboard = async (req) => {
    const countUser = await dashboardRepository.getCountUser();
    const countRoom = await dashboardRepository.getCountRoom(null);
    const countRoomCompleted = await dashboardRepository.getCountRoom(
        {
            status: "COMPLETED"
        });

    // buat section untuk query data Room dan join dengan data USER Winner
    const rooms = await dashboardRepository.getListRoom();

    const data = {
        page: { title: "Halaman admin!" },
        user: (req.user) ? req.user : null,
        content: [
            { title: "USER", count: countUser, grid: 6 },
            { title: "ROOM Finish", count: countRoomCompleted, grid: 6 },
            { title: "ROOM", count: countRoom, grid: 12 }
        ],
        rooms: rooms
    }
    return data
}


// Function export Global
module.exports = {
    /**
     * function to accsess page Dashboard Monolith
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index: async (req, res, next) => {
        // Count Data User
        const data = await getDataDashboard(req);
        res.render("admin", data);
    },

    /**
     * Function RESTFull Api for get data Dashboard
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getDashboard: async (req, res, next) => {
        const data = await getDataDashboard(req);
        res.status(200).json(baseRespone(data, "sucess", "Data Dashboard"))
    }
}


// module.exports = {
//     index : async (req, res, next) => {
//         res.render("admin",
//         { page: { title: "Halaman admin",
//         content: [
//             { title : "USER", count: 10 },
//             { title : "ROOM", count: 3 }
//         ]
//         },
//         user: req.user  
//      })
//     }
// }