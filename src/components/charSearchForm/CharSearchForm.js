
import './charSearchForm.scss'

const CharSearchForm = () => {

    return (
        <div сlassName="char__search">     
                       <div className="char__basics">
                
                    <div>
                        <div className="char__info-name">Or find a character by name:</div>
                        <div className="char__btns">
                            <input/>
                            <a href="" className="button button__main">
                                <div className="inner">FIND</div>
                            </a>
                            <a href="" className="button button__secondary">
                                <div className="inner">TO PAGE</div>
                            </a>
                        </div>
                    </div>
            </div> 
        </div>
    )
}

export default CharSearchForm;