

// get / api / user 
async function getUserData(req, res) {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        res.json({
            success: true,
            role,
            recentSearchedCities
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

export default getUserData;
// Store Serached citites 
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const user = req.user;

        console.log("Before:", user.recentSearchedCities);

        if (!user.recentSearchedCities.includes(recentSearchedCity)) {
            if (user.recentSearchedCities.length >= 3) {
                user.recentSearchedCities.shift();
            }

            user.recentSearchedCities.push(recentSearchedCity);
        }

        console.log("After Push:", user.recentSearchedCities);

        await user.save();

        console.log("After Save:", user.recentSearchedCities);

        res.json({
            success: true,
            message: "City added"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};