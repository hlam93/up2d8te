(function () {
	angular
		.module('forumApp')
		.service('bible', bible);

	function bible () {
		var verses = [
			{
				id: 1,
				ref: "Proverbs 3:5-6",
				text: "Trust in the Lord with all your heart and lean not on your own understanding.  In all of your ways acknowledge him and he will set your paths straight."
			}, {
				id: 2,
				ref: "Joshua 1:9",
				text: "Be strong and courageous.  Do not be frightened and do not be dismayed.  For the Lord your God is with you wherever you go."
			}, {
				id: 3,
				ref: "Hebrews 12:11",
				text: "For the moment all discipline seems painful rather than pleasant, but later it yields the peaceful fruit of righteousness to those who have been trained by it."
			}, {
				id: 4,
				ref: "1 Corinthians 9:25-26",
				text: "Every athlete exercises self-control in all things. They do it to receive a perishable wreath, but we an imperishable. So I do not run aimlessly; I do not box as one beating the air."
			}
		];

		var getVerses = function () {
			return verses;
		};

		return {
			getVerses : getVerses
		};
	}
})();