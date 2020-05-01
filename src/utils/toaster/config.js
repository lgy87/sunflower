import { Intent } from "@blueprintjs/core"

export default {
  show: {
    // use defaults, nothing to do.
  },
  primary: {
    icon: "info-sign",
    intent: Intent.PRIMARY,
  },
  success: {
    icon: "tick",
    intent: Intent.SUCCESS,
  },
  warning: {
    icon: "hand",
    intent: Intent.WARNING,
  },
  error: {
    icon: "warning-sign",
    intent: Intent.DANGER,
  },
}
