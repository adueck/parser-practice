import { languages } from "./languages";

languages.forEach((language) => {
    describe(`${language.name} language`, () => {
        language.parsers.forEach((parser) => {
            describe(`with ${parser.label}`, () => {
                language.tests.forEach((t) => {
                    test(`${t.input} = ${t.value}`, () => {
                        expect(
                            language.evaluator(
                                parser.parser(
                                    language.tokenizer(t.input)
                                )
                            )
                        ).toEqual(t.value);
                    });
                });
            });
        });
    });
});