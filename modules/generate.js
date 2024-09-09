const {GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} = require("@google/generative-ai");
const googlekey = "AIzaSyC2xfwq36PMTKk_la7o3AZGDloWuSqzblM";

// Configuring the AI bot.
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    }
]

const genAI = new GoogleGenerativeAI(googlekey);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash", safetySettings});

exports.genReview = async function () {
    // Chance that a controversy will be added onto the review.
    const CONT_CHANCE = 0.8;

    // List of possible traits for a reviewer to have and a controversy they must defend Mr. Pod from.
    const traits = [
        "evil beyond measure", 
        "sassy with extra gravy", 
        "angelic",
        "chip (only speak in meows)",
        "pressurized pillow",
        "crazy mad scientist",
        "gambling addict",
        "former united states president",
        "michelle obama",
        "a gluttonous slob who moans when typing",
        "bike pump enthusiast",
        "concerned economist",
        "lustful",
        "anarchist",
        "evangelical",
        "mega church pastor",
        "big chungus",
        "jimmy fallon",
        "baby with no object permanence",
        "tortured artist",
        "alien who speaks in hieroglyphs",
        "kanye west",
        "man being held hostage to write review",
        "the legendary super saiyan",
        "a jumped up pantry boy who never knew his place",
        "a beautiful anime girl who everybody want down to the last molecule",
        "foot enthusiast",
        "gynecologist"
    ];

    const controversies = [
        "homophobia",
        "child slavery",
        "gave children to infertile homeless people which caused them to die of exposure",
        "ripped a child in half",
        "killed a man in broad daylight in front of a blind man",
        "fraud in the venusian slime fields",
        "forged signature on book report",
        "donated money to terrorist organization",
        "gave the president hiv",
        "pubic indecency",
        "war crimes",
        "for what he did in 1928"
    ];

    // Getting a random trait and controversy.
    const selectedTrait = traits[Math.floor(Math.random() * traits.length)];
    const selectedCont = controversies[Math.floor(Math.random() * controversies.length)];

    let prompt = "You are a customer with an exaggerated caricature of the following trait: '" + selectedTrait + ".' You need to write a review for PodClub, featuring their mascot Mr. Pod, in a positive light. They providing small pods for people to live in and offer a subscription service that includes a communal watering hole, a public bathroom, and access to the on-site internet cafe. You do not have to make mention of all of these, but when you do, make it related to a personal experience. Keep it under three sentences.";

    if (Math.random() > CONT_CHANCE) {
        prompt += "You must actively defend Mr. Pod in light of his recent controversy:" + selectedCont + ". You must explicitly state what controversy he is currently embroiled in.";
    }
    
    const result = await model.generateContent(prompt);

    return result.response.text();
}

exports.genText = async function (prompt) {
    const result = await model.generateContent(prompt);

    return result.response.text();
}