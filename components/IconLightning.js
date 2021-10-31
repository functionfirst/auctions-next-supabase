import Icon from "./Icon"

const IconHeart = ({ className }) => {
  return (
    <Icon className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </Icon>
  )
}

export default IconHeart
