enum CardType {
    Act = 1,
    Goal,
    Keep,
    Rule,
}

enum RuleType {
    Draw = 1,
    Hand,
    Keep,
    Play,
}

export function typeToStr(t: CardType) { return CardType[t] }

export interface IRawCard {
    type: CardType
    subtype?: RuleType | number
    value: number
}

const raw_cards: IRawCard[] = [
    { type: CardType.Rule, subtype: RuleType.Draw, value: 2, },
    { type: CardType.Rule, subtype: RuleType.Draw, value: 3, },
    { type: CardType.Rule, subtype: RuleType.Draw, value: 4, },
    { type: CardType.Rule, subtype: RuleType.Hand, value: 2, },
    { type: CardType.Rule, subtype: RuleType.Hand, value: 3, },
    { type: CardType.Rule, subtype: RuleType.Hand, value: 4, },
    { type: CardType.Rule, subtype: RuleType.Keep, value: 2, },
    { type: CardType.Rule, subtype: RuleType.Keep, value: 3, },
    { type: CardType.Rule, subtype: RuleType.Keep, value: 4, },
    { type: CardType.Rule, subtype: RuleType.Play, value: 2, },
    { type: CardType.Rule, subtype: RuleType.Play, value: 3, },
    { type: CardType.Rule, subtype: RuleType.Play, value: 4, },

    { type: CardType.Keep, value: 1, },
    { type: CardType.Keep, value: 2, },
    { type: CardType.Keep, value: 3, },
    { type: CardType.Keep, value: 4, },
    { type: CardType.Keep, value: 5, },
    { type: CardType.Keep, value: 6, },
    { type: CardType.Keep, value: 7, },
    { type: CardType.Keep, value: 8, },
    { type: CardType.Keep, value: 9, },

    { type: CardType.Goal, value: 1, },
    { type: CardType.Goal, value: 2, },
    { type: CardType.Goal, value: 3, },
    { type: CardType.Goal, value: 4, },
    { type: CardType.Goal, value: 5, },
    { type: CardType.Goal, value: 6, },
    { type: CardType.Goal, value: 7, },
    { type: CardType.Goal, value: 8, },
    { type: CardType.Goal, value: 9, },
]

const cards = raw_cards.map((it, i) => ({ id: i, ...it}))
export default cards