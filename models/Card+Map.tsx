export const mapCardValue = (stringValue: string): number => {
    let numericValue = parseInt(stringValue)
    if (!isNaN(numericValue)) {
        return numericValue;
    }
    else {
        switch (stringValue) {
            case "JACK":
                return 11;
            case "QUEEN":
                return 12;
            case "KING":
                return 13;
            case "ACE":
                return 14;
            default:
                return 0;
        }
    }
};
