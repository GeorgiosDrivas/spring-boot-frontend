const EvaluationForm = () => {
    return(
        <>
            <form action="submit">
                <input type="number" placeholder="Employee's ValueMe ID"/>
                <input type="text" placeholder="Evaluation's title"/>
                <input type="textarea" placeholder="Evaluation's content"/>
            </form>
        </>
    )
}

export default EvaluationForm;