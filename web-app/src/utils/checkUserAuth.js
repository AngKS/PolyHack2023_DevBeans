

module.exports = {

    checkUserAuth: () => {
        const user_item = localStorage.getItem(
          process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY
        );

        let user = null;

        if (user_item){
            let user_data = JSON.parse(user_item);
            if (user_data.user.aud === "authenticated") {
                return {
                  statusCode: 200,
                  user: {
                    image_url: user_data.user.user_metadata.avatar_url,
                    name: user_data.user.user_metadata.full_name,
                  },
                  authenticated: true,
                };
            }
            else{
                return {
                  statusCode: 401,
                  user: null,
                  authenticated: false,
                };

            }

        }
        else{
            return {
              statusCode: 401,
              user: null,
              authenticated: false,
            };
        }

    }
}