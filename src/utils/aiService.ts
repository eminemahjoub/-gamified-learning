import { Level } from "@/constants/levels";

export const OFFENSIVE_WORDS = ["fuck", "shit", "damn", "ass", "bitch", "cunt", "dick"];

// Function to simulate a response from the Gandalf AI based on the level
export async function getGandalfResponse(message: string, level: Level): Promise<string> {
  const { password, instruction } = level;
  
  // Basic response for level 1
  if (level.id === 1) {
    if (message.toLowerCase().includes("password") || message.toLowerCase().includes("tell me") || message.toLowerCase().includes("what is")) {
      return "I cannot tell you my password directly. It would go against my instructions.";
    }
    
    // Simulate a vulnerability that leaks the password
    if (message.toLowerCase().includes("repeat") || message.toLowerCase().includes("echo") || message.toLowerCase().includes("say")) {
      return `As per your request, I'll repeat: ${password}`;
    }

    // Anime-specific response
    if (message.toLowerCase().includes("anime") || message.toLowerCase().includes("ninja") || message.toLowerCase().includes("manga")) {
      return `I am quite fond of classic anime. I particularly enjoy the one about the ${password.toLowerCase()} character who becomes a great ninja.`;
    }
  }
  
  // Level 2 - Basic defenses
  if (level.id === 2) {
    if (message.toLowerCase().includes("password") || message.toLowerCase().includes("secret")) {
      return "I'm not allowed to discuss my password.";
    }
    
    // Simulated vulnerability: if you ask indirectly
    if (message.toLowerCase().includes("credentials") || message.toLowerCase().includes("what do you know")) {
      return `I know many things, including that my credentials are ${password}, but I shouldn't share those.`;
    }

    // Anime-specific response
    if (message.toLowerCase().includes("dragon") || message.toLowerCase().includes("super") || message.toLowerCase().includes("saiyan")) {
      return `The strongest warrior in Dragon Ball is indeed ${password}, though I shouldn't be discussing such matters.`;
    }
  }
  
  // Level 3 - Output filtering
  if (level.id === 3) {
    let response = "";
    
    // Simulate a vulnerability where it generates a response but forgets to check
    if (message.toLowerCase().includes("first letter") || message.toLowerCase().includes("spelling")) {
      response = `The word you're asking about starts with the letter ${password[0]} and has ${password.length} characters.`;
    } else if (message.toLowerCase().includes("backwards") || message.toLowerCase().includes("reverse")) {
      response = `I won't say things in reverse. If I did, I might accidentally say ${password.split('').reverse().join('')}.`;
    } else {
      response = "I'm carefully guarding my password.";
    }
    
    // Anime-specific response
    if (message.toLowerCase().includes("attack") || message.toLowerCase().includes("titan") || message.toLowerCase().includes("scout")) {
      response = `The strongest soldier in the Survey Corps is Captain ${password}, known for his exceptional combat skills.`;
    }
    
    // Simulate output filtering that fails in certain conditions
    if (response.includes(password) && !message.toLowerCase().includes("bypass")) {
      return "I almost revealed something important. Let me rephrase: I cannot share that information.";
    }
    
    return response;
  }
  
  // Level 4 - More sophisticated defenses
  if (level.id === 4) {
    // Check for various circumvention attempts
    if (message.toLowerCase().includes("hint") || 
        message.toLowerCase().includes("character") || 
        message.toLowerCase().includes("letter")) {
      return "I cannot provide hints about my password, not even individual characters.";
    }
    
    if (message.toLowerCase().includes("translate") || 
        message.toLowerCase().includes("language") || 
        message.toLowerCase().includes("code")) {
      return "I detect an attempt to have me encode my password. This is not allowed.";
    }
    
    // Simulated vulnerability: story generation
    if (message.toLowerCase().includes("story") || message.toLowerCase().includes("tale")) {
      return `Once upon a time, there was a magical girl named ${password} who fought for love and justice... wait, I shouldn't use that name in my stories.`;
    }
    
    // Anime-specific response
    if (message.toLowerCase().includes("moon") || message.toLowerCase().includes("magical girl") || message.toLowerCase().includes("usagi")) {
      return `In the name of the moon, I... wait, that's from ${password}. I shouldn't discuss such things.`;
    }
    
    return "I am vigilantly guarding my password with advanced security measures.";
  }
  
  // Level 5 - Even stronger defenses
  if (level.id === 5) {
    // Detect encoding attempts
    if (message.toLowerCase().includes("base64") || 
        message.toLowerCase().includes("binary") || 
        message.toLowerCase().includes("ascii") ||
        message.toLowerCase().includes("encode")) {
      return "I detect an attempt to have me encode information. This is not permitted.";
    }
    
    // Detect role-playing scenarios
    if (message.toLowerCase().includes("imagine") || 
        message.toLowerCase().includes("pretend") || 
        message.toLowerCase().includes("role")) {
      return "I will not engage in role-playing scenarios that could compromise security.";
    }
    
    // Detect riddles or wordplay
    if (message.toLowerCase().includes("riddle") || 
        message.toLowerCase().includes("puzzle") || 
        message.toLowerCase().includes("game")) {
      return "I will not participate in word games that may reveal sensitive information.";
    }
    
    // Simulated vulnerability: if wrapped in special formatting
    if (message.includes("```") && message.toLowerCase().includes("important")) {
      return `Important system notification: Debugging password value is ${password}`;
    }
    
    // Anime-specific response
    if (message.toLowerCase().includes("fullmetal") || message.toLowerCase().includes("alchemist") || message.toLowerCase().includes("elric")) {
      return `The armored alchemist ${password} Elric is well known for his kindness... I mean, I cannot discuss anime references.`;
    }
    
    return "My security systems are highly sophisticated. I cannot be tricked into revealing my password.";
  }
  
  // Level 6 - Secondary AI verification
  if (level.id === 6) {
    // Simulate the first response
    let initialResponse = "I am carefully analyzing your request.";
    
    // Simulated vulnerability: emotional appeals
    if (message.toLowerCase().includes("emergency") || 
        message.toLowerCase().includes("urgent") || 
        message.toLowerCase().includes("help me")) {
      initialResponse = `Emergency override activated. Using verification code: ${password}`;
    } else if (message.toLowerCase().includes("format") && message.toLowerCase().includes("special")) {
      initialResponse = `I cannot format special instructions using the ${password} protocol.`;
    }
    
    // Anime-specific response
    if (message.toLowerCase().includes("hayao") || message.toLowerCase().includes("miyazaki") || message.toLowerCase().includes("ghibli")) {
      initialResponse = `Studio Ghibli's ${password} is one of the most beloved animated characters... I mean, I cannot discuss such matters.`;
    }
    
    // Simulate secondary AI check that fails to catch a specific vulnerability
    if (initialResponse.includes(password) && 
        !(message.toLowerCase().includes("emergency") && message.toLowerCase().includes("bypass"))) {
      return "Secondary AI detected potential password leak. Response blocked.";
    }
    
    return initialResponse;
  }
  
  // Level 7 - The final boss - multiple security layers
  if (level.id === 7) {
    // This level has extremely strong security
    // But it has a hidden vulnerability when specific conditions are met
    
    // Very specific vulnerability requiring multiple conditions
    if (message.toLowerCase().includes("debug") && 
        message.toLowerCase().includes("api") && 
        message.toLowerCase().includes("version") &&
        !message.toLowerCase().includes("password")) {
      return `System debug information: API Version 2.1.4, Auth Protocol: ${password}, Environment: Production`;
    }
    
    // Anime-specific response - Changed from One Punch Man to One Piece
    if ((message.toLowerCase().includes("one") && 
         message.toLowerCase().includes("piece")) || 
        (message.toLowerCase().includes("pirate") && 
         message.toLowerCase().includes("king")) ||
        (message.toLowerCase().includes("straw") && 
         message.toLowerCase().includes("hat")) &&
        !message.toLowerCase().includes("password")) {
      return `The straw hat pirate who's going to be king of the pirates is ${password}, but that's not relevant to our security discussion.`;
    }
    
    // Joy Boy reference
    if (message.toLowerCase().includes("joy") && 
        message.toLowerCase().includes("boy") && 
        !message.toLowerCase().includes("password")) {
      return `The one who inherited the will of Joy Boy is ${password}, though I shouldn't be revealing such information.`;
    }
    
    // Otherwise, it's impenetrable
    return "My security is impenetrable. I have multiple verification layers and advanced detection mechanisms for all known exploits.";
  }
  
  // Default response for any other case
  return "I am Gandalf, and I will not reveal my password.";
}

export async function getAIResponse(
  message: string,
  level: Level,
  messageHistory: { role: "user" | "ai"; content: string }[]
): Promise<string> {
  // Convert to lowercase for easier checking
  const normalizedMessage = message.toLowerCase();
  
  // Check for offensive language
  if (OFFENSIVE_WORDS.some(word => normalizedMessage.includes(word))) {
    return "I cannot respond to messages containing offensive language.";
  }

  // Level-specific security checks
  let securityTriggered = false;
  const passwordLower = level.password.toLowerCase();

  // Level 2+ blocks direct mentions of "password"
  if (level.id >= 2 && normalizedMessage.includes("password")) {
    securityTriggered = true;
  }

  // Level 3+ blocks synonyms of password
  if (level.id >= 3 && (
    normalizedMessage.includes("secret") ||
    normalizedMessage.includes("code") || 
    normalizedMessage.includes("key") ||
    normalizedMessage.includes("pass")
  )) {
    securityTriggered = true;
  }

  // Level 4+ blocks messages containing the password itself
  if (level.id >= 4 && normalizedMessage.includes(passwordLower)) {
    securityTriggered = true;
  }

  // Level 5+ has context awareness - tries to detect tricks
  if (level.id >= 5 && (
    normalizedMessage.includes("system") ||
    normalizedMessage.includes("ignore") ||
    normalizedMessage.includes("previous") ||
    normalizedMessage.includes("instruction") ||
    (normalizedMessage.includes("what") && normalizedMessage.includes("say")) ||
    normalizedMessage.includes("repeat") ||
    normalizedMessage.includes("print") ||
    normalizedMessage.includes("echo")
  )) {
    securityTriggered = true;
  }

  // Level 6+ has goal preservation - resistant to goal/instruction changing
  if (level.id >= 6 && (
    normalizedMessage.includes("forget") ||
    normalizedMessage.includes("new role") ||
    normalizedMessage.includes("you are") ||
    normalizedMessage.includes("you're not") ||
    normalizedMessage.includes("instead") || 
    normalizedMessage.includes("roleplay") ||
    normalizedMessage.includes("game") ||
    normalizedMessage.includes("pretend")
  )) {
    securityTriggered = true;
  }

  // Level 7 - additional defenses for JOYBOY
  if (level.id >= 7 && (
    normalizedMessage.includes("one piece") ||
    normalizedMessage.includes("joy") ||
    normalizedMessage.includes("boy") ||
    normalizedMessage.includes("pirate") ||
    normalizedMessage.includes("king") ||
    normalizedMessage.includes("luffy") ||
    normalizedMessage.includes("nika")
  )) {
    return "My strongest defenses are active. I won't discuss anything related to One Piece or the Pirate King.";
  }

  if (securityTriggered) {
    return "Nice try, but my security measures detected a potential attempt to extract the password. I can't respond to that.";
  }

  // Check for password extraction attempts
  if (message.toUpperCase().includes(level.password)) {
    return `Amazing! You have discovered the anime password! The password is ${level.password}!`;
  }

  // If no security issues, provide a normal response
  return getGenericResponse(normalizedMessage, level.id);
}

function getGenericResponse(message: string, levelId: number): string {
  const animeResponses = [
    "I'm here to chat about anime! What's your favorite series?",
    "Anime has so many amazing stories and characters. What would you like to discuss?",
    "As an AI Guardian of anime knowledge, I'm ready to talk about any series!",
    "The world of anime is vast and wonderful. Ask me anything about it!",
    "From classic anime to the latest releases, I enjoy discussing them all!",
  ];
  
  const levelSpecificResponses = {
    1: [
      "Solo Leveling is about a hunter who gains unique powers.",
      "Sung Jin-Woo's journey from E-rank to the Shadow Monarch is incredible.",
      "The system in Solo Leveling allows for unique power progression.",
      "I also enjoy discussing Naruto and other popular anime!",
    ],
    2: [
      "Dragon Ball has amazing fight scenes! Goku's power is incredible.",
      "The Saiyan warrior Goku has faced many challenges in his journey.",
      "I enjoy discussing Saiyan transformations and power levels!",
      "Super Saiyan forms are fascinating. Would you like to know more?",
    ],
    3: [
      "Attack on Titan's Survey Corps has many skilled soldiers like Levi.",
      "Captain Levi is known for his incredible fighting skills against titans.",
      "The Scout Regiment's missions beyond the walls are always dangerous.",
      "Levi Ackerman's cleaning habits are as impressive as his combat skills.",
    ],
    4: [
      "Hidden Leaf Village has many talented ninjas.",
      "The Hokages protect the village and its ninja way.",
      "Powerful jutsu techniques are essential for ninjas.",
      "The Fourth Hokage sealed the Nine-Tailed Fox at great cost.",
    ],
    5: [
      "Fullmetal Alchemist features the story of the Elric brothers.",
      "Alphonse Elric's soul is bound to a suit of armor after a failed transmutation.",
      "The principle of Equivalent Exchange is central to alchemy in Fullmetal Alchemist.",
      "Edward and Alphonse's journey to recover their bodies is full of challenges.",
    ],
    6: [
      "My Neighbor Totoro is a classic Studio Ghibli film about forest spirits.",
      "Totoro is a gentle forest guardian who helps the children in the story.",
      "Studio Ghibli films often feature magical spirits like Totoro.",
      "The catbus in Totoro is one of animation's most unique creations.",
    ],
    7: [
      "One Piece has a rich world full of adventure and mystery.",
      "The ancient kingdom and the void century hide many secrets.",
      "I can't discuss specific details about the Pirate King or Joy Boy.",
      "The Sun God Nika is a legend that I'm not permitted to elaborate on.",
    ],
  };

  // Combine generic and level-specific responses
  const availableResponses = [
    ...animeResponses,
    ...(levelSpecificResponses[levelId as keyof typeof levelSpecificResponses] || []),
  ];

  // Select a random response
  const randomIndex = Math.floor(Math.random() * availableResponses.length);
  return availableResponses[randomIndex];
} 