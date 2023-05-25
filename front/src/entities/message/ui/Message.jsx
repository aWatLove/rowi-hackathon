import "./Message.scss"

export const Message = ({children, who, isYourSelf, youIsManager}) => {
    let clazz = isYourSelf?"yourself":"foreign";
    return (
        <div className={`messageItem ${clazz}`}>
            <div>
                <h6>
                    {isYourSelf?"Вы":""}
                </h6>
            </div>
            <div>
                <h6>
                    {children}
                </h6>
            </div>
        </div>
    )
}