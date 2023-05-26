class LocalStorage {
    elements = {
        elementsLocalStorage:(user)=> cy.window().then((win) => {
            const localStorage = win.localStorage;
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage.getItem(key);
                    // Hacer algo con el key/value obtenido
                    expect(user).to.eq(key)
                    expect(value).to.exist
            }
        })
    };

    localElements(user){
        this.elements.elementsLocalStorage(user)
    }
}
export const localStorage = new LocalStorage();

