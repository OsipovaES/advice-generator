// Получение случайного совета
export const getRandomAdvice = async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) throw new Error("Advice API error");
    const data = await response.json();
    return {
      id: data.slip.id,
      text: data.slip.advice,
      type: "advice",
    };
  } catch (error) {
    throw new Error("Failed to fetch advice");
  }
};

// Получение случайного пользователя
export const getRandomUser = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) throw new Error("User API error");
    const data = await response.json();
    const user = data.results[0];
    return {
      name: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.large,
      country: user.location.country,
    };
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
