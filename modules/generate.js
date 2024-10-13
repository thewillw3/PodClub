const {GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} = require("@google/generative-ai");
const googlekey = process.env.GOOGLE_KEY;

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

    // List of possible reviewers and a potential controversy they must defend Mr. Pod from.
    const characters = [
        {
            img: "imgs/reviewers/evil.jpg",
            trait: "evil beyond measure" 
        },
        {
            img: "imgs/reviewers/sassy.jpg",
            trait: "sassy with extra gravy"
        },
        {
            img: "imgs/reviewers/angelic.jpg",
            trait: "angelic"
        },
        {
            img: "imgs/reviewers/chip.jpg",
            trait: "chip (only speak in meows)"
        },
        {
            img: "imgs/reviewers/scientist.jpg",
            trait: "crazy mad scientist"
        },
        {
            img: "imgs/reviewers/gambler.jpg",
            trait: "gambling addict"
        },
        {
            img: "imgs/reviewers/michelle.jpg",
            trait: "michelle obama"
        },
        {
            img: "imgs/reviewers/slob.jpg",
            trait: "a gluttonous slob who moans when typing"
        },
        {
            img: "imgs/reviewers/bike-pump.jpg",
            trait: "bike pump enthusiast"
        },
        {
            img: "imgs/reviewers/economist.jpg",
            trait: "concerned economist"
        },
        {
            img: "imgs/reviewers/lust.jpg",
            trait: "lustful"
        },
        {
            img: "imgs/reviewers/anarchist.jpg",
            trait: "anarchist"
        },
        {
            img: "imgs/reviewers/evangelical.jpg",
            trait: "evangelical"
        },
        {
            img: "imgs/reviewers/pastor.jpg",
            trait: "mega church pastor"
        },
        {
            img: "imgs/reviewers/chungus.jpg",
            trait: "big chungus"
        },
        {
            img: "imgs/reviewers/jimmy.jpg",
            trait: "jimmy fallon"
        },
        {
            img: "imgs/reviewers/baby.jpg",
            trait: "baby with no object permanence"
        },
        {
            img: "imgs/reviewers/artist.jpg",
            trait: "tortured artist"
        },
        {
            img: "imgs/reviewers/alien.gif",
            trait: "alien who speaks in his own language"
        },
        {
            img: "imgs/reviewers/kanye.jpg",
            trait: "kanye west"
        },
        {
            img: "imgs/reviewers/hostage.jpg",
            trait: "man being held hostage to write review"
        },
        {
            img: "imgs/reviewers/lssj.jpg",
            trait: "the legendary super saiyan"
        },
        {
            img: "imgs/reviewers/anime-girl.jpg",
            trait: "a beautiful anime girl who everybody want down to the last molecule"
        },
        {
            img: "imgs/reviewers/foot.jpg",
            trait: "foot enthusiast"
        }
    ];

    const controversies = [
        "homophobia",
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
    const selectedChar = characters[Math.floor(Math.random() * characters.length)];
    const selectedCont = controversies[Math.floor(Math.random() * controversies.length)];

    let prompt = "You are a customer with an exaggerated caricature of the following trait: '" + selectedChar.trait + ".' You need to write a review for PodClub, featuring their mascot Mr. Pod, in a positive light. They provide small pods for people to live in and offer a subscription service that includes a communal watering hole, a public bathroom, and access to the on-site internet cafe. You do not have to make mention of all of these, but when you do, make it related to a personal experience. Keep it under 300 characters.";

    if (Math.random() > CONT_CHANCE) {
        prompt += "You must actively defend Mr. Pod in light of his recent controversy:" + selectedCont + ". You must explicitly state what controversy he is currently embroiled in.";
    }
    
    const result = await model.generateContent(prompt);

    finalChar = {
        response: result.response.text(),
        img: selectedChar.img
    }

    return finalChar;
}

exports.genPodEligibility = async function (name) {
    const emotions = [
        'fear',
        'anger',
        'joy',
        'elation',
        'shock',
        'sadness',
        'overwhelming urge to defecate'
    ];

    const curEmotion = emotions[Math.floor(Math.random() * emotions.length)];

    let prompt = "You are playing Mr. Pod, the creator of the housing company PodClub. PodClub specializes in providing afforable pods to live in which are extremely compact cubes supporting only a bed and some optional storage. You also offer a subscription to a communal watering hole, public bathrooms, and an on-site internet cafe. " + name + " was wondering if they would be a good fit for this community. Upon seeing their request, you feel " + curEmotion + ". Write a response that either denies them entry or welcomes them with open arms. Do not include a sign-off and signature. Generate about six sentences. Ensure to make what emotion you're feeling clear.";

    const result = await model.generateContent(prompt);

    return result.response.text();
}