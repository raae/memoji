/* global Vue, _, twemoji, emojiCodes */

var emojiSource = {
  categories: {
    faces: _.range(128513,128592),
    //transport: _.range(128640,128704),
    //food: _.range(parseInt("1F354",16),parseInt("1F373",16)),
    //activities: _.range(parseInt("1F3A3",16),parseInt("1F3CA",16)),
    critters: _.range(parseInt("1F40C",16),parseInt("1F43E",16)),
    //morefaces: _.range(parseInt("1F466",16),parseInt("1F488",16)),
    actionPacked: _.range(parseInt("1F525",16),parseInt("1F529",16))
  },
  getAll: function () {
    return _.flatten(_.values(this.categories));
  },
  getRandom: function (count) {
    return _.shuffle(this.getAll()).slice(0, count);
  }
}

var app = new Vue({
  el: '#app',
  data: {
    numberOfTries: 0,
    emojis: emojiSource.getRandom(6),
    selectedCardIndexes: [],
    pairedIndexes: []
  },
  computed: {
    cards: function () {

      var cards = _.flatMap(this.emojis, function(n) {
        return [n, n];
      });
      
      return _.shuffle(cards);
    }
  },
  watch: {
    selectedCardIndexes: function(newIndexes) {
      if(newIndexes.length === 2 && this.isEqual(newIndexes[0], newIndexes[1])) {
        this.pairedIndexes.push(newIndexes);
        this.selectedCardIndexes = [];
      } else {
        this.selectedCardIndexs = newIndexes;
      }
    }
  },
  methods: {
    isEqual: function(cardIndex1, cardIndex2) {
      return this.cards[cardIndex1] === this.cards[cardIndex2];
    },
    select: function (cardIndex) {
      if(this.selectedCardIndexes.length === 2) {
        this.selectedCardIndexes = [];
      }
      if(this.isSelected(cardIndex)) {
        return;
      }
      this.selectedCardIndexes.push(cardIndex);
      if(this.selectedCardIndexes.length === 2) {
        this.numberOfTries += 1;
      }
    },
    isSelected: function (cardIndex) {
      return -1 !== _.findIndex(this.selectedCardIndexes, function(i) {
        return i === cardIndex;
      });
    },
    isPaired: function (cardIndex) {
      var pairedIndexes = _.flatten(this.pairedIndexes);
      return -1 !== _.findIndex(pairedIndexes, function(i) {
        return i === cardIndex;
      });
    },
    emojiCodeAsImg: function (emojiCode) {
      return twemoji.parse(twemoji.convert.fromCodePoint(emojiCode));
    }
  }
})