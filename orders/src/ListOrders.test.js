const rewire = require("rewire")
const ListOrders = rewire("./ListOrders")
const is_finish = ListOrders.__get__("is_finish")
// @ponicode
describe("is_finish", () => {
    test("0", () => {
        is_finish({ beer1finish: true, beer3finish: true, beer2finish: true })
    })

    test("1", () => {
        is_finish({ beer1finish: false, beer3finish: true, beer2finish: false })
    })
})
