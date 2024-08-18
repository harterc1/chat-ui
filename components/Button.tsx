import { Pressable, StyleSheet, Text } from "react-native"

enum Variants {
  primary = "primary",
  secondary = "secondary",
}

const Button = ({
  title,
  onPress,
  variant = Variants.primary,
  disabled,
}: {
  title: string,
  onPress: () => void,
  variant?: keyof typeof Variants,
  disabled?: boolean
}) => (
  <Pressable
    onPress={onPress}
    hitSlop={{
      top: hitSlopVertical,
      bottom: hitSlopVertical,
      left: hitSlopHorizontal,
      right: hitSlopHorizontal,
    }}
    disabled={disabled}
    style={({ pressed }) => ([
      styles.base,
      styles[variant],
      pressed && pressedStyles[variant],
      disabled && styles.disabled,
    ])}
  >
    <Text
      style={[
        textStyles.base,
        textStyles[variant],
      ]}
    >
      {title}
    </Text>
  </Pressable>
)

const Constants = {
  minWidth: 80,
  height: 36,
}

const minTapRect = 44
const hitSlopVertical = (minTapRect - Constants.height) / 2
const hitSlopHorizontal = (minTapRect - Constants.minWidth) / 2

const styles = StyleSheet.create({
  base: {
    height: Constants.height,
    minWidth: Constants.minWidth,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#222",
  },
  secondary: {
    borderColor: "#cccc",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "white",
  },
  pressed: {
    backgroundColor: "#ccc",
  },
  disabled: {
    opacity: 0.4,
  },
})

const pressedStyles = StyleSheet.create({
  primary: {
    backgroundColor: "#555",
  },
  secondary: {
    backgroundColor: "#eeeeee",
  },
})

const textStyles = StyleSheet.create({
  base: {
    fontWeight: "500",
  },
  primary: {
    color: "white",
  },
  secondary: {
    color: "#222"
  },
})

export default Button