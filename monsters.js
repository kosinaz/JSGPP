/*global monsterLister*/
monsterLister([
  {
    "name": "goblin grunt",
    "minHealth": 20,
    "maxHealth": 30,
    "resists": ["cold", "poison"],
    "weaknesses": ["fire", "light"]
  },

  {
    "name": "goblin wizard",
    "prototype": "goblin grunt",
    "spells": ["fire ball", "lightning bolt"]
  },

  {
    "name": "goblin archer",
    "prototype": "goblin grunt",
    "attacks": ["short bow"]
  }
]);
