const getElementoPorId = (state, id) => {
    return state.companies.find(company => company.idCompany === id);
};

export { getElementoPorId };