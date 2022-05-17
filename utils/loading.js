export default function setLoading(state) {
    if (state) {
        document.querySelector('.loading').classList.add('active');
    } else {
        document.querySelector('.loading').classList.remove('active');
    }
}
