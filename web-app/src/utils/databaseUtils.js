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

const getUserTweets = async (user_id) => {
  const TABLE_NAME = "Tweets Table"

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
        percentage: 0,
      }
    }
  }
  else{

    let total = data.length
    let count = 0

    let TOPICS = {}

    data.map((item) => {
      if (item.tweet_sentiment.labels.length > 0){
        count += 1
      }
      
      // check top 3 most viewed topics
      item.topics.topics.map((item) => {
        // check if item in TOPICS
        if (item == "" || item == undefined || item == null){
          // do nothing
        }
        else{
          if (item in TOPICS) {
            TOPICS[item] += 1;
          } else {
            TOPICS[item] = 1;
          }
        }

      })
    })

    // calculate percentage
    let percentage = (count / total) * 100

    // sort TOPICS, get top 3
    let sorted = Object.keys(TOPICS).sort(function(a,b){return TOPICS[b]-TOPICS[a]})
    let top3 = sorted.slice(0,3)
    top3.forEach((item, index) => {
      // change each item into {"topic": "count"}
      top3[index] = {
        name: item,
        count: TOPICS[item]
      }
    })

    return {
      statusCode: 200,
      body: {
        data: data,
        payload: JSON.stringify(data),
        percentage: percentage,
        top3: top3
      }
    }



  }

}


const getUserInputMetrics = async (user_id) => {
  const TABLE_NAME  = "User Recommended Text Table"
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

export {
  readFullDatabase,
  getBrowsingHistory,
  getUserInputMetrics,
  getUserTweets,
};