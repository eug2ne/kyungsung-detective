import quizengine from "./quizlibrary/quizengine"

const load_quizinstance = async (id, user) => {
    // import quizinstance from db
    const {
        defaultSet,
        user_id,
        quizinstance
    } = await importSet(id, user)

    // import quizengine
    const {
        back,
        forward,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
    } = quizengine(quizinstance.reverse)

    return {
        defaultSet,
        user_id,
        quizinstance,
        back,
        forward,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
    }
}

export default load_quizinstance