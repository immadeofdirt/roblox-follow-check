// api/isFollowing.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  try {
    // Roblox API: Get the list of users the given user is following
    const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings`);
    const data = await response.json();

    // Check if the hardcoded developer ID is in the list
    const developerId = 5097071535; // your Roblox user ID
    const isFollowing = data.data?.some(user => user.id === developerId) || false;

    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check follow status" });
  }
}
