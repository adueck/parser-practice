import { languages } from "./languages";

languages.forEach((language) => {
    // for every language
    describe(`${language.name} language`, () => {
        // test each parser
        language.parsers.forEach((parser) => {
            describe(`with ${parser.label}`, () => {
                // doing every example 
                language.tests.forEach((t) => {
                    test(`${t.input} = ${JSON.stringify(t.value)}`, () => {
                        expect(
                            language.evaluator(
                                parser.parser(
                                    language.tokenizer(t.input)
                                )
                            )
                        ).toEqual(t.value);
                    });
                });
                language.errors.forEach((e) => {
                    test(`${e} is illegal`, () => {
                        expect(() => {
                            language.evaluator(parser.parser(language.tokenizer(e)))
                        }).toThrow();
                    });
                });
            });
        });
    });
});