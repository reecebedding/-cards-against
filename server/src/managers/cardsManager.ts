import CardModel, { CardType } from '../models/CardModel';
import { Game } from '../database/Game';
import * as PlayerDatabase from '../database/Player';
import * as GameDatabase from '../database/Game';
import { PlayerModel } from 'src/models/PlayerModel';
import { GameModel } from 'src/models/GameModel';

const maxAllowedCardsPerPerson = 7;

export class CardsManager {
    
    public static async DealPlayerWhiteCards(playerId: string, gameId: string): Promise<CardModel[]> {
        let player: PlayerModel = (await Game.findById(gameId)).players.filter(x =>  x.id === playerId)[0];
        const drawnCards: CardModel[] = [];
        for(let i=0; i < (maxAllowedCardsPerPerson - player.cards.length); i++){
            drawnCards.push(generateWhiteCard());
        }
        player.cards = player.cards.concat(drawnCards);
        await PlayerDatabase.Player.update(player);
        
        return drawnCards;
    }

    public static async DealGameBlackCard(gameId: string): Promise<GameModel> {
        let game: GameModel = (await Game.findById(gameId));
        
        game.blackCard = generateBlackCard();
        
        return await GameDatabase.Game.update(game);        
    }
}


function generateWhiteCard(): CardModel {
    const nouns: string[] = ["bird", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"];
    const verbs: string[] = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"];
    const adjectives: string[] = ["beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy"];
    const adverbs: string[] = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"];

    const card: CardModel = {
        id: generateCardId(),
        type: CardType.White,
        text: adjectives[Math.floor(Math.random() * 10)] + " " + nouns[Math.floor(Math.random() * 10)] + " " + adverbs[Math.floor(Math.random() * 10)] + " " + verbs[Math.floor(Math.random() * 10)] + "."
    }

    return card;
};

function generateBlackCard(): CardModel {
    const blackCards: string[] = [
        "I don't mean to brag, but they call me the Michael Jordan of __",
        "GREETINGS HUMANS I AM __ BOT EXECUTING PROGRAM",,
        "The CIA now interrogates enemy agents by repeatedly subjecting them to __.",
        "__: kid-tested, mother-approved.",
        "A romantic, candlelit dinner would be incomplete without __.",
        "Blessed are you, Lord our God, creator of the universe, who has granted us __",
        "What's the crustiest?",
        "What's my secret power?",
        "What's making things awkward in the sauna?",
        "Next season on Man vs. Wild, Bear Grylls must survive in the depths of the Amazon with only __ and his wits."
    ];

    const text = blackCards[Math.floor(Math.random() * blackCards.length)];
    const requiredAnswersCount = text.split(" ").filter((x) => { return x === "__"; }).length;

    return {
        id: generateCardId(),
        type: CardType.Black,
        text: text,
        requiredAnswers: (requiredAnswersCount === 0) ? 1 : requiredAnswersCount
    };
}

function generateCardId(): string{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}