import Icon from "./Icon"

const IconMenu = ({ className }) => {
  return (
    <Icon className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </Icon>
  )
}

export default IconMenu
