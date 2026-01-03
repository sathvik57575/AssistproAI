import sql from "../configs/db.js";



export const getUserCreations = async(req,res)=>{
    try {
        const {userId} = req.auth();

        let allCreations = await sql `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

        res.json({success: true, content: allCreations})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const getPublishedCreations = async(req,res)=>{
    try {
        let publishedCreations = await sql `SELECT * from creations WHERE publish = true ORDER BY created_at DESC`;
        res.json({success: true, content: publishedCreations})
    } 
    catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


/*
commenting this out as this method might create race conditions when 2 users like at same time, Both read the same old likes array
Both write back different updates, so One like is lost 

export const toggleLike = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const {creationId} = req.body;

        //fetch the creaton first;
        let [thisCreation] = await sql `SELECT * FROM creations WHERE id = ${creationId}`;
        //this sql query will return an array, so we can either deconstruct or use let creations = sqlQuery, and let thisCreation = creations[0]

        if(!thisCreation){
            return res.json({success:false, message:'creation not found'})
        }
        
        //likes is an array which stores the user_ids of all the users who likes that creation
        let currentLikes = thisCreation.likes;
        const userIdString = userId.toString(); //userId maynot always be string depending on clerk SDK, can be null, undefined, or an object in some rare cases. So always safe to convert into string

        let updatedLikes;
        let message;

        // we can even do if(currentLikes.find(el=>el==userIdString)){...}
        if(currentLikes.includes(userIdString)){
            //remove the rest of elements using filter array method
            updatedLikes = currentLikes.filter(el=>el!==userIdString);
            message = 'Creation Unliked';
        }
        else{
            //adding userId string in this
            updatedLikes = [...currentLikes, userIdString];
            message = 'Creation Liked';
        }

        //adding it back to the DB(updating the DB)
        await sql `UPDATE creations SET likes = ${updatedLikes} updated_at = NOW() WHERE id = ${creationId}`

        res.json({success: true, message})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

*/

export const toggleLike = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id:creationId } = req.body; //since we sending it as id, and we're using it as creationId

    const userIdString = userId.toString();

    const [updatedCreation] = await sql`
      UPDATE creations
      SET likes =
        CASE
          WHEN ${userIdString} = ANY(likes)
          THEN array_remove(likes, ${userIdString})
          ELSE array_append(likes, ${userIdString})
        END,
        updated_at = NOW()
      WHERE id = ${creationId}
      RETURNING *;
    `;

    if (!updatedCreation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const liked = updatedCreation.likes.includes(userIdString);

    res.json({
      success: true,
      message: liked ? "Creation Liked" : "Creation Unliked",
      likesCount: updatedCreation.likes.length
    });

  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
