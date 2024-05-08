import React from "react";
import { useEffect, useState } from "react";
import "../style/planScreen.scss";
import db from "../firebase";
import { Firestore, query, where, addDoc } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// import { getProducts } from "@stripe/firestore-stripe-payments";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@stripe/firestore-stripe-payments";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { getProducts } from "@stripe/firestore-stripe-payments";

const PlanScreen = () => {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "products");
    const q = query(collection(db, "products"), where("active", "==", true));

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(q);
      const productsinfo = {};
      querySnapshot.forEach(async (doc) => {
        products[doc.id] = doc.data();

        const priceSnap = await getDocs(collection(doc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[doc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
    };

    setProducts(products);
    fetchProducts();
  }, [products]);

  console.log(products);


  const loadCheckout = async (priceId) => {
        await addDoc(collection(db, "customers",user.uid).collection("checkout_session"))
    const docRef = await addDoc(collection(db, "checkout_session"), {
      price: priceId,
      success_url : window.location.origin,
      cancel_url : window.location.origin,
    });

        docRef.onSnapshot(async(snap)=>{
          const{error,sessionId}=snap.data()
          if (error) {
            alert(`An error occured: ${error.message} ` )
          }

          if (sessionId)
          {
            const stripe = await loadStripe("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")
            stripe.redirectToCheckout({
              sessionId
            })
          }
    })
  };



  const url = "https://netflix-backend-beta-ten.vercel.app/api";
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {})
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));

    console.log("lets gooo CSKKKK!!!");
  };


  return (
    <div className="PlanScreen">
      PlanScreen
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="planScreen_plans">
            <div key={productId} className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={handleCheckout}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
