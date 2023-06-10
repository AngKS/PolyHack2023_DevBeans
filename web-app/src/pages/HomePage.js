import {React, useState, useEffect} from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Content from "../components/main/Content";

function HomePage() {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      // get local storage
      console.log(process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY);
      const user = localStorage.getItem(
        process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY
      );
      console.log(user)
      if (user ) {
        let user_data = JSON.parse(user);
        if (user_data.user.aud === "authenticated"){
          setUserInfo({
            image_url: user_data.user.user_metadata.avatar_url,
            name: user_data.user.user_metadata.full_name,
          });
        }
          
      }
    }, []);

  return (
    <div className="h-full min-h-screen bg-[#F1FCFE]">
        <Header userInfo={userInfo} />
        <Content />
        <Footer />
    </div>
  );
}

export default HomePage;