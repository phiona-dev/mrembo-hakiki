
const Badge = ({ type }) => {
     const styles = {
        genuine: {backgroundColor: "#10b981", color: "white", text: "Genuine"},
        counterfeit: {backgroundColor: "ef4444", color: "white", text: "Likely a fake product"}
    }
  return (
    <span style={{
        backgroundColor: styles[type].backgroundColor,
        color: styles[type].color,
    }}
    >
       {styles[type].text} 
    </span>
  )
}

export default Badge