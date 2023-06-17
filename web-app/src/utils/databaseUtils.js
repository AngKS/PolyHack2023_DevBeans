const supabase = require("@supabase/supabase-js");
const client = supabase.createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// read database
const readFullDatabase = async (tableName) => {
  console.log(tableName);
  let { data, error } = await client.from(tableName).select("*");
  if (error) {
    return {
      statusCode: 400,
      body: {
        data: null,
        payload: null,
      },
    };
  } else {
    if (data.length > 0) {
      return {
        statusCode: 200,
        body: {
          data: data,
          payload: JSON.stringify(data),
        },
      };
    } else {
      return {
        statusCode: 404,
        body: {
          data: null,
          payload: null,
        },
      };
    }
  }
};

export { readFullDatabase };