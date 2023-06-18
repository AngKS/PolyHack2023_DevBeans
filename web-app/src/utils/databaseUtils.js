const supabase = require("@supabase/supabase-js");
const client = supabase.createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);


const getBrowsingHistory = async (user_id) => {
  const TABLE_NAME = "Browsing Activities Table"
  let { data, error } = await client
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    return {
      statusCode: 400,
      body: {
        data: null,
        payload: null,
      },
    }
  }
  else {
    if (data.length > 0) {
      return {
        statusCode: 200,
        body: {
          data: data,
          payload: JSON.stringify(data),
        },
      }
    }
    else {
      return {
        statusCode: 404,
        body: {
          data: null,
          payload: null,
        },
      }
    }

  }
}

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

const getUserInputMetrics = async (user_id) => {
  const TABLE_NAME  = "User Recommended Text Table"
  let { data, error } = await client
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", user_id);
  
    console.log(data, error);

  if (error) {
    return {
      statusCode: 400,
      body: {
        data: null,
        payload: null,
        percentage: 0
      }
    }
  }
  else {
    // calculate percentage  = total number of userr input != null / total number of rows
    let total = data.length
    if (total === 0){
      return {
        statusCode: 200,
        body: {
          data: data,
          payload: JSON.stringify(data),
          percentage: 0
      }
    }
  }
    let count = 0
    data.map((item) => {
      if (item.text_accepted !== null){
        count += 1
      }
    })
    let percentage = (count / total) * 100
    return {
      statusCode: 200,
      body: {
        data: data,
        payload: JSON.stringify(data),
        percentage: percentage

      }
  }
}

}

export { readFullDatabase, getBrowsingHistory, getUserInputMetrics };