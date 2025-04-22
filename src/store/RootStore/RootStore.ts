import { AuthStore } from './AuthStore/AuthStore';
import { CartStore } from './CartStore/CartStore';
import { FavoritesStore } from './FavoritesStore/FavoritesStore';
import { OrderHistoryStore } from './OrderHistoryStore/OrderHistoryStore';
import { QueryParamsStore } from './QueryParamsStore/QueryParamsStore';
import { ThemeStore } from './ThemeStore/ThemeStore';

export default class RootStore {
  readonly queryParams = new QueryParamsStore();
  readonly auth = new AuthStore();
  readonly theme = new ThemeStore();
  readonly cart = new CartStore();
  readonly orderHistory = new OrderHistoryStore()
  readonly favorites = new FavoritesStore()
}
