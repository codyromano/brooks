export const getRequestLetterContent = (onClickCallback) => ({
  title: `You're out of letters!`,
  about: ``,
  buttons: [
    {
      text: 'Ask David to write a letter',
      onClick: onClickCallback,
      priority: 'high'
    }
  ]
});

export const getBonusContent = (onClickCallback) => ({
  title: `You unlocked bonus content!`,
  about: `Now you can watch a special cutscene.`,
  buttons: [
    {
      text: 'View cutscene',
      onClick: onClickCallback,
      priority: 'high'
    }
  ]
});
