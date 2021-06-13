import English from './en.json'

const getCurrentTranslation = () => {
  switch (process.env.TRANSLATION) {
    default:
      return English
  }
}

export default getCurrentTranslation()
