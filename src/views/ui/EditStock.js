// import React, { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import "../ComStyle/EditStock.scss"

// const EditStock = () => {
//   const history = useHistory();
//   const { stockId } = useParams();
//   const [stockData, setStockData] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     quantity: 0,
//     price: 0,
//   });

//   // Fetch stock data from the backend based on stockId
//   useEffect(() => {
//     // Make an API call to fetch stock data using stockId
//     // Replace the placeholder URL with your actual API endpoint
//     fetch(`https://api.example.com/stocks/${stockId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setStockData(data);
//         setFormData({
//           name: data.name,
//           quantity: data.quantity,
//           price: data.price,
//         });
//       })
//       .catch((error) => {
//         console.log("Error fetching stock data:", error);
//       });
//   }, [stockId]);

//   const handleFormChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Make an API call to update the stock data
//     // Replace the placeholder URL with your actual API endpoint
//     fetch(`https://api.example.com/stocks/${stockId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Stock updated successfully:", data);
//         // Redirect to the stock details page after successful update
//         history.push(`/stocks/${stockId}`);
//       })
//       .catch((error) => {
//         console.log("Error updating stock:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Edit Stock: {stockData.name}</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label htmlFor="name">Stock Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleFormChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="quantity">Quantity:</label>
//           <input
//             type="number"
//             id="quantity"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleFormChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleFormChange}
//           />
//         </div>
//         <button type="submit">Update Stock</button>
//       </form>
//     </div>
//   );
// };

// export default EditStock;
