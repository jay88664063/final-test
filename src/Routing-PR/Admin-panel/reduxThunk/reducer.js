import Img1 from '.././../Assets/Image/picture1.jpg'
import Img2 from '.././../Assets/Image/picture2.jpg'
import Img3 from '.././../Assets/Image/picture3.jpg'
import Img4 from '.././../Assets/Image/picture4.jpg'

const initialState = {
    product: [
        { id: 0, name: "vivo v27 pro", image: Img1, price:38000, qty: 1 },
        { id: 1, name: "iPhone 15", image: Img2, price:77500, qty: 1 },
        { id: 2, name: "oppo 11 pro", image: Img3, price:40000, qty: 1 },
        { id: 3, name: "realme 11 pro", image: Img4, price:23000, qty: 1 },
    ],
    cart: [],
    count: 0,
    total: 0,
};

const reducer = (state = initialState, action) => {
    // console.log(state.total);
    if (action.type === "AddToCart") {
        // cart.reduce((acc, sum)=>{
        //     return state.total + state.cart 
        // }, state.total)
        const itemExist = state.cart.some((item) => item.id === state.product[action.payload].id);
        if (!itemExist) {
            return {
                ...state, cart: [...state.cart, { ...state.product[action.payload] }],
                total: state.total + parseFloat(state.product[action.payload].price),
            };
        } else {
            return {
                ...state, cart: state.cart.map((item) => item.id === state.product[action.payload].id ? { ...item, qty: item.qty + 1 } : item),
                total: state.total + parseFloat(state.product[action.payload].price),
            };
        }
       
    }
    if (action.type === 'DeleteItem') {
        const deletedItem = state.cart[action.payload];
        return {
            ...state,
            cart: state.cart.filter((item, id) => id !== action.payload),
            total: state.total - parseFloat(deletedItem.price * deletedItem.qty),
        };
    }

    if (action.type === 'Count') {
        return { ...state, count: state.cart.length };
    }
    if (action.type === 'Increment') {
        var itemIndex = action.payload
        // console.log(state.product[action.payload].price )
        return {
            ...state, cart: state.cart.map((item, id) => id === itemIndex ? { ...item, qty: item.qty + 1 } : item),
            total: state.total + parseFloat(state.cart[itemIndex].price),
        };
    }
    if (action.type === 'Decrement') {
        var itemIndex = action.payload
        const deletedItem = state.cart[itemIndex];
        if (state.cart[itemIndex].qty > 1) {
            return {
                ...state, cart: state.cart.map((item, id) => id === itemIndex ? { ...item, qty: item.qty - 1 } : item),
                total: state.total - parseFloat(state.cart[itemIndex].price),
            };

        }
        return {
            ...state,
            cart: state.cart.filter((item, id) => id !== action.payload),
            total: state.total - parseFloat(deletedItem.price * deletedItem.qty),
        };
        // const updatedCart = state.cart.map((item, id) =>
        //     id === itemIndex ? { ...item, qty: Math.max(1, item.qty - 1) } : item
        // );

        // const deletedItem = state.cart[action.payload];
        // // const updatedTotal = state.total - parseFloat(deletedItem.price);
        // console.log(deletedItem)

        // return {
        //     ...state,
        //     cart: updatedCart,
        //     // total: updatedTotal,
        // };
    }
    if (action.type === 'DeleteAll') {
        console.log({...state, cart: []})
        return { ...state, cart: [] , count: 0, total: 0};

    }
    return state;
}

export default reducer