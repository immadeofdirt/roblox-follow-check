export default async function handler(req, res) {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    try {
        const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings?sortOrder=Asc&limit=100`);
        if (!response.ok) throw new Error("Failed to fetch Roblox API");

        const data = await response.json();
        const followsCreator = data.data.some(user => user.id === 5097071535);

        res.status(200).json({ followsCreator });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}