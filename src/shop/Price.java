package shop;import java.io.IOException;import java.io.PrintWriter;import java.sql.Connection;import java.sql.PreparedStatement;import java.sql.ResultSet;import java.sql.SQLException;import java.text.DecimalFormat;import javax.servlet.ServletException;import javax.servlet.http.HttpServlet;import javax.servlet.http.HttpServletRequest;import javax.servlet.http.HttpServletResponse;import org.json.JSONObject;import org.omg.PortableInterceptor.SUCCESSFUL;import api.DataLink;import api.GoodsInfo;public class Price extends HttpServlet {	/**		 * Constructor of the object.		 */	public Price() {		super();	}	/**		 * Destruction of the servlet. <br>		 */	public void destroy() {		super.destroy(); // Just puts "destroy" string in log		// Put your code here	}	/**		 * The doGet method of the servlet. <br>		 *		 * This method is called when a form has its tag value method equals to get.		 * 		 * @param request the request send by the client to the server		 * @param response the response send by the server to the client		 * @throws ServletException if an error occurred		 * @throws IOException if an error occurred		 */	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		doPost(request, response);	}	/**		 * The doPost method of the servlet. <br>		 *		 * This method is called when a form has its tag value method equals to post.		 * 		 * @param request the request send by the client to the server		 * @param response the response send by the server to the client		 * @throws ServletException if an error occurred		 * @throws IOException if an error occurred		 */	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		request.setCharacterEncoding("UTF-8");		response.setContentType("text/html");		response.setCharacterEncoding("utf-8");		int goodsID = Integer.parseInt(request.getParameter("goodsID"));		String color = request.getParameter("color");		String screen = request.getParameter("screen");		String storage = request.getParameter("storage");		System.out.println("color&&screen&&storage&&goodsID"+color+screen+storage+goodsID);		float price = 0;		int stock = 0;		JSONObject json = new JSONObject();		PrintWriter out = response.getWriter();		GoodsInfo goodsInfo = new GoodsInfo(goodsID, color, screen, storage);		price = goodsInfo.getPrice();		stock = goodsInfo.getStock();		System.out.println("price&&stock:"+price+"&&"+stock);		DecimalFormat df = new DecimalFormat("0.00");		System.out.println(df.format(price));		if(price!=0){			json.put("status", "success");			json.put("price", df.format(price));			json.put("stock", stock);			out.write(json.toString());			System.out.println(json.toString());			out.flush();			out.close();		}		else{			json.put("status", "fail");			json.put("price", df.format(price));			out.write(json.toString());			out.flush();			out.close();		}	}	/**		 * Initialization of the servlet. <br>		 *		 * @throws ServletException if an error occurs		 */	public void init() throws ServletException {		// Put your code here	}}