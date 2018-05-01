var friends = require("../data/friends");


module.exports = function (app) {
    // used to display a JSON of all possible friends
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    // used to handle incoming survey results & compatibility logic.
    app.post("/api/friends", (req, res) => {

        var newScores = req.body.scores;

        var bestMatch = [{ diff: 1000 }];

        //go through array of all the friends
        friends.forEach((friend) => {
            var diff = 0;
            //go through the newScores for each friend and tally the differences the between each answer
            friend.scores.forEach((score, index) => {
                diff += Math.abs(score - newScores[index]);
            });

            //go through bestMatch array and current friend is a better match (diff is less), replace that friend
            //if current friend is equally as good of a match, add it to bestMatch
            bestMatch.forEach((match, index) => {
                if (match.diff > diff) {
                    bestMatch.splice(index, 1, {
                        name: friend.name,
                        photo: friend.photo,
                        diff: diff
                    });
                }
                //allows more than on best match
                else if (match.diff === diff) {
                    bestMatch.push(
                        {
                            name: friend.name,
                            photo: friend.photo,
                            diff: diff
                        }
                    );
                }
            });
        });

        res.json(bestMatch);
    });
}


