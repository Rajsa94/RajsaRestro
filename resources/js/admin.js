import axios from "axios";
// function initAdmin(){
//     const orderTableBody = document.querySelector('#orderTableBody')
//     let orders = []
//     let markup

//     axios.get('/admin', {
//         headers:{
//             "X-Requested-with": "XMLHttpRequest"
//         }
//     }).then(res =>{
//         orders = res.data,
//         markup = generateMarkup(orders)
//         orderTableBody.innerHTML = markup
//     }).catch(err =>{
//         console.log(err)
//     })
//     function renderItems(items) {
//         let parsedItems = Object.values(items)
//         return parsedItems.map((menuItem) => {
//             return `
//                 <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
//             `
//         }).join('')
//       }
//     function generateMarkup(orders){
//         return orders.map(order => {
//             return `
//             <tr>
//                 <th scope="row">1</th>
//                 <td>
//                 <p>${order._Id }<p/>
//                 <p>${renderItems(order.items) }<p/>
//                 </td>
//                 <td>${order.customerId.name }</td>
//                 <td>${order.address }</td>
//                 <td><form class="form-select" aria-label="Default select example action="/admin/order/status" method="post"">
//                 <option selected>Open this select menu</option>
//                 <option value="order_placed"
//                 ${ order.status === 'order_placed' ? 'selected' : '' }>Confirmed</option>
//                 <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>Two</option>
//                 <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>Delivered</option>
//                 <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>Completed</option>
//               </form></td>
//               <td>${order.updatedAt }</td>

//               </tr>`
//         }).join('')
//     }

// }

// export default initAdmin


import Noty from 'noty'

export function initAdmin() {
    // const TableBody = document.querySelectorAll('#orderTableBody')
    const TableBody = document.getElementById('orderTableBody')
    console.log(TableBody)
    let orders = []
    let markup

    axios.get('/admin', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        // console.log(orders)
        markup = generateMarkup(orders)
        // console.log(markup)
        TableBody.innerHTML = markup


    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {

            return `   <tr>
                <th scope="row">1</th>
                <td>
                <p>${order._id}<p/>
                <p>${renderItems(order.items)}<p/>
                </td>
                <td>${order.customerId.name}</td>
                <td>${order.address}</td>
                <td><form action="/status" method="POST">
                <input type="hidden" name="orderId" value="${ order._id }">
                <select name="status" onchange="this.form.submit()"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option value="order_placed"
                        ${ order.status === 'order_placed' ? 'selected' : '' }>
                        Placed</option>
                    <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                        Confirmed</option>
                    <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                        Prepared</option>
                    <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                        Delivered
                    </option>
                    <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                        Completed
                    </option>
                </select>
            </form></td>
              <td>${order.updatedAt}</td>

              </tr> `

        }).join('')
    }

}
